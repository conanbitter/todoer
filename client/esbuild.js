import esbuild from 'esbuild'

var watchMode = false;

process.argv.forEach(function (val, index, array) {
    if (val === "--watch") {
        watchMode = true;
    }
});

var options = {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outfile: '../www/static/bundle.js'
}

if (watchMode) {
    options.watch = {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else console.log('watch build succeeded:', result)
        }
    }
}

if (watchMode) {
    esbuild.build(options)
        .then(result => {
            console.log('watching...')
        })
        .catch(() => process.exit(1))
} else {
    esbuild.build(options)
        .catch(() => process.exit(1))
}