/* eslint-disable no-console */

import Benchmark from 'benchmark';

(async function runBenchmark() {
    const suite = new Benchmark.Suite();
    const module = await require(process.argv[2]);
    for (const testName of Object.keys(module)) {
        const provider = module[testName];
        const testFunction = provider();
        testFunction();
        suite.add(testName, testFunction);
    }

    suite.on('cycle', (event) => {
        console.log(String(event.target));
    });
    suite.on('complete', () => {
        console.log(`Fastest is ${suite.filter('fastest').map('name')}`);
    });
    suite.run();
}());
