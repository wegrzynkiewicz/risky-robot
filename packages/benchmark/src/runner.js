import Benchmark from "benchmark";

(async function () {
    const suite = new Benchmark.Suite();
    const module = await import(process.argv[2]);
    for (let testName of Object.keys(module)) {
        const provider = module[testName];
        const testFunction = provider();
        const result = testFunction();
        suite.add(testName, testFunction);
    }

    suite.on('cycle', function (event) {
        console.log(String(event.target));
    });
    suite.on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    });
    suite.run();
})();
