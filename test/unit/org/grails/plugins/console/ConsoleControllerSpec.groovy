package org.grails.plugins.console

import grails.converters.JSON
import grails.test.mixin.TestFor
import grails.util.BuildSettingsHolder
import org.apache.commons.io.FileUtils
import spock.lang.Specification

@TestFor(ConsoleController)
class ConsoleControllerSpec extends Specification {

    ConsoleService consoleService = Mock(ConsoleService)

    void setup() {
        controller.consoleService = consoleService
    }

    void 'index'() {
        when:
        controller.index()

        then:
        model.json.implicitVars.ctx == 'the Spring application context'
    }

    void 'execute'() {
        given:
        params.code = ''

        when:
        controller.execute()

        then:
        1 * consoleService.eval(params.code, true, request) >> [
            result: 'test-result',
            output: 'test-output'
        ]
        with(response.json) {
            result == "'test-result'"
            output == 'test-output'
            totalTime != null
        }
    }

    void 'execute with exception'() {
        given:
        params.code = ''

        when:
        controller.execute()

        then:
        1 * consoleService.eval(params.code, true, request) >> [
            result: 'test-result',
            output: 'test-output',
            exception: new RuntimeException()
        ]
        with(response.json) {
            exception.contains 'RuntimeException'
            output == 'test-output'
            totalTime != null
        }
    }

    void 'listFiles'() {
        given:
        File tempDir = createTempDir()
        File testFile1 = new File(tempDir, 'test1')
        testFile1.createNewFile()
        File testFile2 = new File(tempDir, 'test2')
        testFile2.createNewFile()
        File testDir1 = new File(tempDir, 'dir1')
        testDir1.mkdir()

        params.path = tempDir.absolutePath

        when:
        controller.listFiles()

        then:
        response.json.size() == 3
        response.json[0].id == testDir1.absolutePath
        response.json[0].name == testDir1.name
        response.json[0].type == 'dir'
        response.json[0].lastModified == testDir1.lastModified()
        response.json[1].id == testFile1.absolutePath
        response.json[1].name == testFile1.name
        response.json[1].type == 'file'
        response.json[1].lastModified == testFile1.lastModified()
        response.json[2].id == testFile2.absolutePath
        response.json[2].name == testFile2.name
        response.json[2].type == 'file'
        response.json[2].lastModified == testFile2.lastModified()

        cleanup:
        FileUtils.deleteDirectory(tempDir)
    }

    void 'file get'() {
        given:
        File tempDir = createTempDir()
        File testFile1 = new File(tempDir, 'test1')
        testFile1.createNewFile()
        request.method = 'GET'

        params.path = testFile1.absolutePath

        when:
        controller.file()

        then:
        response.contentType.contains 'application/json'
        response.status == 200
        response.json.id == testFile1.absolutePath
        response.json.name == testFile1.name
        response.json.type == 'file'
        response.json.lastModified == testFile1.lastModified()
    }

    void 'file delete'() {
        given:
        File tempDir = createTempDir()
        File testFile1 = new File(tempDir, 'test1')
        testFile1.createNewFile()
        request.method = 'DELETE'

        params.path = testFile1.absolutePath

        when:
        controller.file()

        then:
        response.status == 200
        !testFile1.exists()
    }

    void 'file put'() {
        given:
        File tempDir = createTempDir()
        File testFile1 = new File(tempDir, 'test1')
        testFile1.createNewFile()
        request.method = 'PUT'

        params.path = testFile1.absolutePath
        request.json = [text: 'testing'] as JSON

        when:
        controller.file()

        then:
        response.status == 200
        testFile1.text == 'testing'
    }

    void 'file post'() {
        given:
        File tempDir = createTempDir()
        request.method = 'POST'

        request.json = [
            path: tempDir.absolutePath,
            name: 'test1',
            text: 'testing'
        ] as JSON

        when:
        controller.file()
        println response.json

        then:
        response.status == 200
        File testFile1 = new File(tempDir, 'test1')
        testFile1.exists()
        testFile1.text == 'testing'
    }

    private File createTempDir() {
        File projectWorkDir = BuildSettingsHolder.settings.projectWorkDir
        File tempDir = new File(projectWorkDir, 'tmp')
        tempDir.mkdir()
        tempDir
    }

}
