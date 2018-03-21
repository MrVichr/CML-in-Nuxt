module.exports = function(grunt) {
  "use strict";

  grunt.initConfig(
   {
    copy: //The first task is copy. This task will copy over the files in our ./public and ./views directories
     {
      build:
       {
        files:
         [
          {
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./dist/public"
          },
          {
            expand: true,
            cwd: "./views",
            src: ["**"],
            dest: "./dist/views"
          }
         ]
       }
     },
    ts: //The next task is ts. This task will compile the TypeScript source code to
        //  JavaScript that can be executed by Node.js. The compiled JavaScript code will be output
        //  to ./dist directory.
     {
      app:
       {
        files:
         [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./dist"
         }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src"
        }
       }
     },
    watch: //The third task is watch. This task will watch for any changes to our TypeScript
           //  source files (*.ts) as well as our view template files (*.pug).
     {
      ts:
       {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
       },
      views:
       {
        files: ["views/**/*.pug"],
        tasks: ["copy"]
       }
     }
   });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "copy",
    "ts"
  ]);

};