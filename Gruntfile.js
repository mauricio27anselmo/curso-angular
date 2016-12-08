(function () {
	'use strict';

	module.exports = function (grunt) {
		require('matchdep').filterDev('grunt-*')
            .forEach(grunt.loadNpmTasks);

        // Configuração do projeto.
		grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                build: {
                    expand: true,
                    src: 'app/**/*.js',
                    dest: 'build'
                }
            },
            ngdocs: {
                options: {
                    dest: 'docs',
                    html5Mode: false,
                    scripts: [
                        'bower_components/angular/angular.js'
                    ]
                },
                api: {
                    src: ['app/**/*.js', '!app/**/my-app.js'],
                    title: 'Docs'
                }
            },
            watch: {
                files: ['app/less/*.less'],
                tasks: ['less', 'postcss']
            },
            less: {
                app: {
                    options: {
						compress: false
					},
                    files: {
						'app/css/curso-angular.css': 'app/less/curso-angular.less'
					}
                }
            },
            postcss: {
				options: {
					map: true,
					processors: [
						require('autoprefixer')({
							browsers: ['last 2 versions']
						})
					]
				},
                app: {
                    src: 'app/css/*.css'
                }
			}
        });

        // Carrega o plugin que fornece a tarefa de "uglify"
        //grunt.loadNpmTasks('grunt-contrib-uglify');

        // Tarefa default
        grunt.registerTask('default', ['watch']);

        // Tarefa de minificar
        grunt.registerTask('minificar', ['uglify']);

        // Tarefa de documentar
        grunt.registerTask('gerardocs', ['ngdocs']);
	};
})();