/**
 * Created by Uladzimir_Artsemenka on 7/25/2016.
 */

import gulp from 'gulp';

import config from '../config.json';

export default function (script, stylus) {
    return () => {
        gulp.watch(config.script, script);
        gulp.watch(config.stylus, stylus);

        return gulp;
    }
}