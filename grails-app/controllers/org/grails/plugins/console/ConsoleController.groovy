package org.grails.plugins.console

import grails.converters.JSON
import grails.util.GrailsUtil
import org.apache.commons.io.FilenameUtils
import org.codehaus.groovy.runtime.InvokerHelper

class ConsoleController {

    def consoleService

    def index = {
        Map model = [
            json: [
                implicitVars: [
                    ctx: 'the Spring application context',
                    grailsApplication: 'the Grails application',
                    config: 'the Grails configuration',
                    request: 'the HTTP request',
                    session: 'the HTTP session',
                ],
                baseUrl: resource(plugin: 'none')
            ]
        ]
        render view: 'index', model: model
    }

    def execute = {
        long startTime = System.currentTimeMillis()

        String code = params.code

        Map results = consoleService.eval(code, true, request)
        if (results.exception) {
            StringWriter sw = new StringWriter()
            new PrintWriter(sw).withWriter { GrailsUtil.deepSanitize(results.exception).printStackTrace(it) }
            results.exception = sw.toString()
        } else {
            results.result = InvokerHelper.inspect(results.result)
        }

        results.totalTime = System.currentTimeMillis() - startTime

        render results as JSON
    }

    def listFiles = { // TODO error handling
        File baseDir = new File(params.path)
        List result
        result = baseDir.listFiles().findAll { !it.hidden }.sort { it.name }.collect { fileToJson it, false }
        render result as JSON
    }

    def file = {
        switch (request.method) {
            case 'GET':
                doFileGet()
                break
            case 'DELETE':
                doFileDelete()
                break
            case 'PUT':
                doFilePut()
                break
            case 'POST':
                doFilePost()
                break
        }
    }

    private doFileGet() {
        String filename = params.path
        Map result = [:]
        int status = 200
        if (filename) {
            File file = new File(filename)
            file.path
            if (file.isDirectory()) {
                result.error = "$filename is a directory"
                status = 400
            } else if (!file.exists() || !file.canRead()) {
                result.error = "File $filename doesn't exist or cannot be read"
                status = 400
            } else {
                result = fileToJson(file)
            }
        }
        render contentType: 'application/json', text: (result as JSON).toString(), status: status
    }

    private doFileDelete() {
        String filename = params.path
        Map result = [:]
        int status = 200
        if (filename) {
            File file = new File(filename)
            if (file.isDirectory()) {
                result.error = "$filename is a directory"
                status = 400
            } else if (!file.exists() || !file.canWrite()) {
                result.error = "File $filename doesn't exist or cannot be deleted"
                status = 400
            } else {
                if (!file.delete()) {
                    result.error = "File $filename could not be deleted"
                    status = 400
                }
            }
        }
        render contentType: 'application/json', text: (result as JSON).toString(), status: status
    }

    private doFilePut() {
        String filename = params.path
        def json = request.JSON
        Map result = [:]
        int status = 200
        if (filename) {
            File file = new File(filename)
            if (file.isDirectory()) {
                result.error = "$filename is a directory"
                status = 400
            } else if (!file.exists() || !file.canWrite()) {
                result.error = "File $filename doesn't exist or cannot be modified"
                status = 400
            } else {
                try {
                    file.write json.text
                } catch (e) {
                    result.error = "File $filename could not be modified"
                    status = 400
                }
            }
        }
        render contentType: 'application/json', text: (result as JSON).toString(), status: status
    }

    private doFilePost() {
        def json = request.JSON
        Map result = [:]
        int status = 200
        File file = new File(json.path.toString(), json.name.toString())
        try {
            file.write json.text
            result = fileToJson(file)
        } catch (e) {
            result.error = "File $json.name could not be created"
            status = 400
        }
        render contentType: 'application/json', text: (result as JSON).toString(), status: status
    }

    private Map fileToJson(File file, boolean includeText = true) {
        Map json = [
            id: FilenameUtils.normalize(file.absolutePath),
            name: file.name,
            type: file.isDirectory() ? 'dir' : 'file',
            lastModified: file.lastModified()
        ]
        if (includeText) {
            json.text = file.text
        }
        json
    }
}
