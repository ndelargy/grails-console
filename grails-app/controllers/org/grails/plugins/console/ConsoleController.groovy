package org.grails.plugins.console

import grails.converters.JSON
import grails.util.GrailsUtil

import org.codehaus.groovy.runtime.InvokerHelper

class ConsoleController {

    def consoleService

    String baseDir = '/Users/mattsheehan/test1' // TODO config

    def index = {
        [
            json: [
                baseUrl: resource(plugin: 'none'),
                baseDir: baseDir
            ]
        ]
    }

    def execute = {
        long startTime = System.currentTimeMillis()

        String code = params.code

        Map results = consoleService.eval(code, true, request)
        if (results.exception) {
            def sw = new StringWriter()
            new PrintWriter(sw).withWriter { GrailsUtil.deepSanitize(results.exception).printStackTrace(it) }
            results.exception = sw.toString()
        } else {
            results.result = InvokerHelper.inspect(results.result)
        }

        results.totalTime = System.currentTimeMillis() - startTime

        render results as JSON
    }

    def listFiles = {
        File baseDir = new File(baseDir)
        List result
        result = baseDir.listFiles().collect { File file ->
            [
                id: file.absolutePath,
                name: file.name,
                lastModified: file.lastModified()
            ]
        }
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
            log.info "Opening File $filename"
            def file = new File(filename)
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
            log.info "Opening File $filename"
            def file = new File(filename)
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
            log.info "Opening File $filename"
            def file = new File(filename)
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
        File baseDir = new File(baseDir)
        def file = new File(baseDir, json.name)
//        if (file.isDirectory()) {
//            result.error = "$filename is a directory"
//            status = 400
//        } else if (!file.exists() || !file.canWrite()) {
//            result.error = "File $filename doesn't exist or cannot be modified"
//            status = 400
//        } else {
            try {
                file.write json.text
                result = fileToJson(file)
            } catch (e) {
                result.error = "File $filename could not be modified"
                status = 400
            }
//        }
        render contentType: 'application/json', text: (result as JSON).toString(), status: status
    }

    private fileToJson(File file) {
        [
            id: file.absolutePath,
            name: file.name,
            lastModified: file.lastModified(),
            text: file.text
        ]
    }

    def saveFile = {
        String filename = params.filename
        String text = params.text
        Map results = [:]
        if (filename) {
            log.info "Opening File $filename"
            def file = new File(filename)
            file.text = text
//            if (file.isDirectory()) {
//                results.error = "$filename is a directory"
//            } else if (!file.exists() || !file.canRead()) {
//                results.error = "File $filename doesn't exist or cannot be read"
//            } else {
//                results.text = file.text
//            }
        }
        render results as JSON
    }
}
