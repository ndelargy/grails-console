import org.grails.plugins.console.ConsoleTagLib

modules = {

	'console' {
        defaultBundle false
        ConsoleTagLib.CSS.each {
            resource url: [dir: it[0], file: it[1], plugin: 'console']
        }
        ConsoleTagLib.JS.each {
            resource url: [dir: it[0], file: it[1], plugin: 'console']
        }
    }
}
