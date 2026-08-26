---
title:  "JSON-LD"
date:   2014-07-03
tags: tech
---

Personally, I find RDF/XML the most horrible serialization of a graph and a lot can be said against specific RDF tools. However, I think the basic model of RDF is pretty sound: everything is expressed as a bunch of triples, each of the format "subject predicate object" (e.g. "Peter knows Manu"), where all three words can actually be expanded to fully qualified IRIs, or the object can also be a literal. An IRI is a [Internationalized resource identifier](http://en.wikipedia.org/wiki/Internationalized_resource_identifier) and a literal a string, number, date or similar which can also be typed.

That's why I'm quite excited by a new RDF serialization format called [JSON-LD](http://json-ld.org/) which is also valid JSON. To get a few things straight for myself, I've written up this introduction which is heavily inspired by the examples in the [specification](http://www.w3.org/TR/json-ld/).

Let's say we have some existing JSON:

    {
      "name": "Manu Sporny",
      "homepage": "http://manu.sporny.org/",
      "image": "http://manu.sporny.org/images/manu.png"
    }

Leveraging the popular [schema.org vocabulary](http://schema.org/), this can be expressed unambiguously as RDF as follows:

    {
      "@id": "http://manu.sporny.org/me", ← Specify the IRI of this resource.
                                            Should also serve as a self-link
                                            to retrieve this JSON.
      "http://schema.org/name": "Manu Sporny",
      "http://schema.org/url": {
        "@id": "http://manu.sporny.org/" ← Here the '@id' keyword means
      },                                   "http://manu.sporny.org/" is an
                                           IRI and not just a string.
      "http://schema.org/image": {
        "@id": "http://manu.sporny.org/images/manu.png"
      }
    }

The above JSON-LD translates to the following three RDF triples in [N3](http://www.w3.org/2000/10/swap/Primer):

    @prefix schema: <http://schema.org/> .
    <http://manu.sporny.org/me> schema:name "Manu Sporny" .
    <http://manu.sporny.org/me> schema:url <http://manu.sporny.org/> .
    <http://manu.sporny.org/me> schema:image <http://manu.sporny.org/images/manu.png> .

To make the JSON backwards-compatible, we can use any plain strings, called **terms**, such as `"name"`, `"homepage"` and `"image"` from our original JSON and define what IRIs they stand for in a separate context.

    {
      "@context": {
        "name": "http://schema.org/name", ← This means that 'name' is
                                            shorthand for 'http://schema.org/name'
        "homepage": {
          "@id": "http://schema.org/url", ← This means that 'homepage' is
                                            shorthand for 'http://schema.org/url'
                                            The usage of '@id' in the context,
                                            such as here, is very different
                                            from the usage of most keywords,
                                            as it gives information about the
                                            key 'homepage' and not the object
                                            '{}' in which it is contained.
          "@type": "@id" ← This means that a string value associated with
        },                 'homepage' should be interpreted as an
                           identifier that is an IRI
        "image": {
          "@id": "http://schema.org/image",
          "@type": "@id"
        }
      },
      "name": "Manu Sporny",
      "homepage": "http://manu.sporny.org/",
      "image": "http://manu.sporny.org/images/manu.png"
    }

If the value of `@context` is a string instead of an object, it means that the context is being served seperately from that URL which can be beneficial when caching is used:

    {
      "@context": "http://json-ld.org/contexts/person.jsonld",
      "name": "Manu Sporny",
      "homepage": "http://manu.sporny.org/",
      "image": "http://manu.sporny.org/images/manu.png"
    }

Say this document is located at `http://manu.sporny.org/me`, then that will be used as the **base IRI** to resolve relative links. This example shows also that shorthands work for prefixes as well.

    {
      "@context": {
        "name": "http://schema.org/name",
        "schema": "http://schema.org/",  ← This means that 'schema' is
                                           shorthand for 'http://schema.org/'
        "homepage": {
          "@id": "http://schema.org/url",
          "@type": "@id"
        }
      },
      "name": "Manu Sporny",
      "schema:image": { ← Shorthands works also for prefixes
          "@id": "http://manu.sporny.org/images/manu.png"
      },
      "homepage": "/home", ← all IRIs can also be relative to the base IRI,
                             so this would expand to 'http://manu.sporny.org/home'
      "status": "trolling" ← terms that are not defined in the context are ignored
    }

In addition to the usage of `"@type": "@id"` in the context to declare that a value is an IRI, the `@type` keyword can also be used to specify the **node type** of the object. Specifying node types cannot be done in the context.

    {
      "@context": "http://json-ld.org/contexts/person.jsonld",
      "@id": "http://manu.sporny.org/me",
      "@type": "schema:Person", ← Means that <http://manu.sporny.org/me>
                                has rdf:type schema:Person
      "name": "Manu Sporny",
      "homepage": "http://manu.sporny.org/",
      "image": "http://manu.sporny.org/images/manu.png"
    }

`@type` can even be used in a third way: to specify the **value type** of literals, like the values of "name" and "modified". Specifying value types can be done either in the context or inline:

    {
      "@context": {
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "name": {
          "@id": "http://schema.org/name",
          "@type": "xsd:string" ← define value type in context.
        },
        "modified": {
          "@id": "http://purl.org/dc/terms/modified"
        }
      },
      "@id": "http://manu.sporny.org/me",
      "name": "Manu Sporny",
      "modified": {
        "@type": "xsd:dateTime", ← can also define value type inline
        "@value": "2010-05-29T14:17:39+02:00" ← and then the value itself
      }
    }

Note again that `@id` when used in the context behaves a bit odd: in the example above, `"@id": "http://schema.org/name"` provides information about `"name"` (namely that it's a shorthand for `"http://schema.org/name"`), whereas `@id` when used inline (i.e. not in the context) and `@type` always refer to the JSON object they are a part of. For example `"@type": "xsd:string"` specifies that the target of `"name"`, not `"name"` itself, is of type `xsd:string`.

A final thing to mention, which is intuitive again, is that not only literals but also entire resources can be embedded as property values:

    {
      "@context": {
        "schema": "http://schema.org/",
        "knows" : {
          "@id": "schema:knows"
        },
        "name": {
          "@id": "schema:name"
        }
      },
      "@id": "http://manu.sporny.org/me",
      "@type": "schema:Person",
      "name": "Manu Sporny",
      "knows": {
        "@id": "http://peter.org/me",
        "@type": "schema:Person",
        "name": "Peter"
      }
    }

There are a few more things that might be good to know, so feel free to have a look at the also quite readable [specification](http://www.w3.org/TR/json-ld/).
