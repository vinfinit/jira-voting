/**
 * Created by Uladzimir_Artsemenka on 7/25/2016.
 */

import gulp from 'gulp';
import gulpsync from 'gulp-sync';
const gsync = gulpsync(gulp);

import watch from './tasks/watch';
import stylus from './tasks/stylus';
import script from './tasks/script';

gulp.task('watch', watch(script, stylus));
gulp.task('stylus', stylus);
gulp.task('script', script);

gulp.task('rebuild', gsync.async(['stylus', 'script']));
gulp.task('default', gsync.sync(['rebuild', 'watch']));