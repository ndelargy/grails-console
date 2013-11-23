import org.springframework.core.io.FileSystemResource

class ConsoleGrailsPlugin {
	String version = '1.2'
	String grailsVersion = '1.3.3 > *'
	String author = 'Siegfried Puchbauer/Mingfai Ma'
	String authorEmail = 'siegfried.puchbauer@gmail.com / mingfai.ma@gmail.com'
	String title = 'Console Plugin'
	String description = 'A web-based Groovy console for interactive runtime application management and debugging'
	String documentation = 'http://grails.org/plugin/console'

	String license = 'APACHE'
	def developers = [[name: 'Burt Beckwith', email: 'burt@burtbeckwith.com']]
	def issueManagement = [system: 'JIRA', url: 'http://jira.grails.org/browse/GPCONSOLE']
	def scm = [url: 'https://github.com/burtbeckwith/grails-console']

    def watchedResources = [
        "file:./grails-app/conf/resources.json",
        "file:./plugins/*/grails-app/conf/resources.json"
    ]

    def onChange = { event ->
        println 'change'
        if (event.source instanceof FileSystemResource) {
            println event.source.path
        }
    }
}
