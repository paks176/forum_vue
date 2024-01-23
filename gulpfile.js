const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");

/*
* Основной обработчик scss-файла
* */
function _processScssInner(path) {
	return gulp.src(path, {dot: true, base: "./"})
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(rename({
			extname: ".css"
		}))
		.pipe(gulp.dest("./"))
		.pipe(cleanCss())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("./"))
}

/*
* Для запуска обрабоки конкретного scss-файла из командной строки
* пример:
* gulp processScss --file путь_к_файлу
* */
function processScss() {
	let options = require("minimist")(process.argv.slice(2));

	return _processScssInner(options.file);
}

/*
* Обработка всех scss-файлов
* */
function processAllScss() {
	return _processScssInner("*.scss");
}

/*
* Варианты вотчеров:
* 1. gulp.watch(globs, [options], [task])
*   - нет возможности ограничить таск конкретно только измененным файлом
*   - можно использовать incremental-builds, но первый запуск все равно будет применяться ко всем файлам
* 
* 2. gulp.watch(globs).on(xxx)
*   - no access to the task system integrations, including async completion, queueing, and delay
* 
* 3. Вотчеры в IDE
*   - нестабильно, не всегда соблюдается очередность задач
*   + зато дожидается завершения задач перед аплодом (не нужно аплодить отдельно сгененрированные файлы)
* */
function watchScss() {
	gulp.watch([
		"*.scss",
		"*.scss",
	])
		.on("add", _processScssInner)
		.on("change", _processScssInner);
}

exports.processScss = processScss;
exports.processAllScss = processAllScss;
exports.watchScss = watchScss;