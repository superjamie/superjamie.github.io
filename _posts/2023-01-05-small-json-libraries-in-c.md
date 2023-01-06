---
title: Small JSON libraries in C
---

I wanted a serialisation and parsing library to create and load savegames in plain C. Considering [Cataclysm: Dark Days Ahead](https://cataclysmdda.org/) uses JSON, I figured that was good enough for me. Now to find a library.

A large list of libraries is available at the [Native JSON Benchmark](https://github.com/miloyip/nativejson-benchmark) repository. This also lists scores of some standards conformance tests, and offers some comparative performance numbers of speed and memory usage.

I'm aware of [Jansson](https://github.com/akheron/jansson) and [json-c](https://github.com/json-c/json-c), however these are large shared libraries made up of many individual files. I am looking for something with one or two files that I can compile right into my project.

My first try was [Parson](https://github.com/kgabis/parson) but the API was very confusing to me, and I couldn't understand how to build arrays of integer values. There's even [an answer on StackOverflow](https://stackoverflow.com/questions/49957648/how-to-construct-json-array-with-parson) which didn't enlighten me. No go there.

Next I looked at [cJSON](https://github.com/DaveGamble/cJSON) which is nice and well documented. I particularly like the single data type used for all objects, the memory ownership model, and the fact you can still change an object after you've added it to something. This leads to a good coding pattern like:

* allocate root object
* allocate branch object
* add branch object to root
* add data to branch object

Then if any step fails, you can jump to a failure case which frees the root object, and frees any branches and data you've added.

However, I wasn't a huge fan of the mixed-case coding style and the 64% standards conformance score didn't inspire confidence, so I kept looking.

I then tried [json-builder](https://github.com/json-parser/json-builder) and its accompanying [json-parser](https://github.com/json-parser/json-parser), which ended up being exactly what I'm after.

It has a very similar structure to cJSON, with a single data type `json_value` and same memory model.

Despite having almost no documentation, the API is very concise and the examples given are simple enough to understand it.

It also uses all `snake_case` and underscores, so appears to me visually.

An example of the above coding pattern in `json-builder` is:

```c
#define ARRAY_SIZE 4
char *json_output(void)
{
    /* data to serialise */
    int my_array[ARRAY_SIZE] = { 1, 2, 3, 4 };

    /* create root object which will contain all other data */
    json_value *root_obj = json_object_new(0);
    if (!root_obj)
        return NULL;

    /* create an array, and if that works, instantly attach to the root */
    json_value *array_branch = json_array_new(0);
    if (!array_branch)
        goto out;
    json_object_push(root_obj, "array", array_branch);

    /* walk the array, appending values */
    for (size_t i = 0; i < ARRAY_SIZE ; i++) {
        json_value *array_int = json_integer_new(my_array[i]);
        if (!array_int)
            goto out;
        json_array_push(array_branch, array_int);
    }

    /* serialise */
    char *buffer = calloc(1, json_measure(root_obj));
    if (!buffer)
        goto out;
    json_serialize(buffer, root_obj);

    /* clean up and exit in the success case */
    json_builder_free(root_obj);
    return buffer;

out:
    /* any time we land here, the root object owns all the data, so
     * we can clean up with this one call to free the root object */
    json_builder_free(root_obj);
    return NULL;
}
```

This gives us a nice JSON object containing a named array:

```js
{ "array": [ 1, 2, 3, 4 ] }
```

If you're unfamiliar with this exit style with `goto`, it's quite common in the Linux kernel and other similar system software. I don't know if there's a name for this but I call them "goto trees". More at:

* [Centralized exiting of functions - Linux kernel coding style](https://www.kernel.org/doc/html/latest/process/coding-style.html#centralized-exiting-of-functions)
* [Use of Goto in Systems Code - John Regehr](https://blog.regehr.org/archives/894)

Anyway, I'm very happy with this, I will use `json-builder` and `json-parser`.

