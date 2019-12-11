import Core from "robo24-core";
import Eatable from "../../unit-traits/Eatable";

const fruits = [
    {id: "apple", name: "Apple", traits: []},
    {id: "pear", name: "Pear", traits: []},
];

const collection = [];
for (let fruit of fruits) {
    const {id, name, traits} = fruit;

    const fruitSeed = new Core.Unit({
        id: `@native/seed/fruit/${id}`,
        name: `${name} seed`,
        categories: ["seed", "fruit", "natural"],
        tags: [`${fruit}-seed`],
        traits: [
            new Eatable(),
            ...traits,
        ],
    });
    collection.push(fruitSeed);

    const fruit = new Core.Unit({
        id: `@native/food/fruit/${id}`,
        name,
        categories: ["food", "fruit", "natural"],
        tags: [fruit],
        traits: [
            new Eatable(),
            ...traits,
        ],
    });
    collection.push(fruit);
}

export default collection;
