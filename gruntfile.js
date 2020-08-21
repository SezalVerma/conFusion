// use strcit js code
'use strict';  

module.exports = function(grunt){

    require('time-grunt')(grunt);
    
    require('jit-grunt')(grunt ,  { useminPrepare : 'grunt-usemin'} );
        // useminPrepare task specified in this file will be handled by grunt-usemin plugin , 
        // if not specified , jit-grunt looks for useminPrepare  plugin which might not be existing
       

    grunt.initConfig({

        /*  sass - task to execute
            -dist : under dist folder
            -files: under files of dist
            'css/styles.scss' : convert this file to 'css/styles.css'
            , : ',' after every task is very important
         */
        sass : {
            dist : {
                files : {
                    'css/styles.css' : 'css/styles.scss'
                }
            }
        },

        // watch all .scss files , if any change in them , then execute the 'sass' task above
        watch : {
            files : 'css/*.scss',
            tasks : ['sass']
        },

        /* bsFiles - contains src of all files that are to be loaded to browser
           dev     - development mode of browser
           baseDir - that contains all the src files mentioned in bsFiles
         */
        browserSync :{
            dev :{
                bsFiles:{
                    src :[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options :{
                    watchTask : true ,
                    server : {
                        baseDir : "./"
                    }
                }
            }  
        },
        
        /*   copy - task   ,,, copy html & fonts files
                 expand & dot - configs for copy task
                 cwd - current working directory where src files are present
                 dest - destination
         */
        copy :{
            
            html:{
                files: [{
                    expand : true,
                    dot : true,
                    cwd : './',
                    src : ['*.html'],
                    dest : 'dist'
                }]
            },

            fonts :{
                files:[{
                    expand : true,
                    dot : true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest : 'dist'
                }]
            }
        },

        clean : {
            build:{
                src : ['dist/']
            }
        },

        imagemin : {
            dynamic : {
                files:[{
                    expand : true,                   // allow dynamic expansion
                    dot : true,
                    cwd : './',
                    src : ['img/*.{png, jpg,gif}'],
                    dest : 'dist/',
                }]
            }
        },

        useminPrepare:{
            foo :{
                dest: 'dist',
                src : ['index.html', 'aboutus.html','contactus.html']
            },
            options:{
                flow:{
                    steps:{
                        css : ['cssmin'],
                        js : ['uglify']
                    },

                    post :{
                        //  This code is needed for configuring font-awesome tools
                        css :[{
                            name : 'cssmin',
                            createConfig: function(context,block){
                                var generated = context.options.generated;
                                generated.options={
                                    keepSpecialComments : 0 , rebase : false
                                }
                            }
                        }]
                    }
                }
            }
        },

        concat :{
            options: {
                separator : ';'
            },
            //dist configuration is provided by useminPrepare
            dist:{}
        },

        // need to specify dist folder for proper functioning
        //dist configuration is provided by useminPrepare 
        cssmin :{
            dist:{}
        },

        uglify:{
            dist :{}
        },

        filerev:{
            options:{
                // options used to create rev number attached at end of css n js files
                algorithm: 'md5',
                length : 20,
                encoding : 'utf8'
            },
            release :{
                files:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.js'
                    ]
                }]
            }
        },

        usemin :{
            html: ['dist/contactus.html', 'dist/aboutus.html','dist/index.html'],
            options :{
                // assests - where all css , html , js files are kept
                assetsDir: ['dist','dist/js','dist/css']
            },
            
        },

        // in grunt , htmlmin is applied after usemin so that we already get minified css n js files for htmlmin task
        htmlmin :{
            dist :{
                options :{
                    // remove all blank spaces from file
                    collapseWhitespace : true,
                },
                // convert file in dist folder & save resulting file in dist folder only wid the same name
                files :{
                    'dist/aboutus.html'   :"dist/aboutus.html",
                    'dist/contactus.html' :"dist/contactus.html",
                    'dist/index.html'     :"dist/index.html"

                }
            }
        }

    });

/*  css - name of task 
    sass - task to execute , described under initConfig() 
*/
    grunt.registerTask('css', ['sass'])

    //  always write 'watch' task at end , otherwise it wont allow other tasks to execute after it
    grunt.registerTask('default', ['browserSync' , 'watch'])

    // specify tasks in same order as they are to be performed 
    grunt.registerTask('build', [
        'clean', 
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ])
}


/*  to do a single task --- 
    in terminal,                 grunt <name of task in registerTask , eg sass >
    
    default task ----------
    happens automatically whatever written in default named registerTask
                                 grunt
 */
