package org.grails.plugins.console

import grails.converters.JSON
import grails.util.GrailsUtil

import org.codehaus.groovy.runtime.InvokerHelper

class ConsoleController {

	def consoleService

	def index = {
		[:]
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
        File baseDir = new File('/Users/mattsheehan/test')
        Map result = [:]
        result.data = baseDir.listFiles().collect { File file ->
            [
                id: file.absolutePath,
                name: file.name,
                lastModified: file.lastModified()
            ]
        }
        render result as JSON
    }

    def file = {
        // TODO DELETE PUT etc...
        String filename = params.path
        Map result = [:]
        if (filename) {
            log.info "Opening File $filename"
            def file = new File(filename)
            if (file.isDirectory()) {
                result.error = "$filename is a directory"
            } else if (!file.exists() || !file.canRead()) {
                result.error = "File $filename doesn't exist or cannot be read"
            } else {
                result.id = file.absolutePath
                result.name = file.name
                result.lastModified = file.lastModified()
                result.text = file.text
            }
        }
        render result as JSON
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
