---
title: 'Advice for prospective operations researchers'
pubDate: 2026-09-04
---

For the past few years I have been participating to operations research conferences as an Industry Man, that is, affiliated with my employer rather than with a university.

The Industry Man is a specimen that arouses considerable curiosity in young researchers, who are keen to find out what operations research actually looks like once it is applied inside a company.

Students have asked me more than once what my job is like and what they should do with their careers. I answer by telling them the things I would tell, with hindsight, the version of me from a few years ago. So I thought I would write my advice for prospective operations researchers[^1] down in a post, if only to get my own thoughts in order.

Let us start with the fundamentals. In my view, the ideal operations researcher is a computer scientist with a solid grounding in optimization on top.[^2] The reason is that, in practice, the job is not so much about developing algorithms as about designing decision support systems, whose ultimate purpose is to create value for the people who use them. The algorithm, essential as it is, is one component of that system.

Decision support systems are, fundamentally, data systems. Anyone who has worked with optimization algorithms can confirm that the quality of a solution depends first and foremost on the quality of the input data. Being able to work with data therefore matters enormously, and that data is more often than not neither as clean nor as consistent as the benchmark instances in the literature.

In practice, far more of the code goes into handling data than into the optimization model itself. The data usually comes from sources that were never meant to feed an optimization algorithm: ERPs, spreadsheets, and the like. This work looks like grunt work, but it is where a great deal of the value is. Data quality reporting is often one of the first things users genuinely appreciate, and now and then it brings to light process problems nobody knew they had.

As for the optimization component, solver-based approaches are generally preferable to developing ad hoc algorithms. By “ad hoc algorithm” I mean the case where we write the search strategy ourselves (a constructive heuristic, a metaheuristic, a customized branch-and-price, and so on) rather than writing a model and handing it to a general-purpose engine. This is a major point of divergence from academia, where there is no shortage of papers on hyper-specialized algorithms for, say, exotic VRP variants. Not that those contributions have no reason to exist, but the needs of industry make that kind of approach a poor fit.[^3]

I come down on the side of solvers for several reasons: they absorb change more easily, they keep optimization logic separate from business logic, and they leave behind software that can still be maintained years later.

Systems, by their nature, evolve over time: new use cases, new requirements, more users. Change is natural, and generally a good sign, since it means our product is actually being used and can be further evolved. Sometimes, instead, it means we had misunderstood something. Either way, handling change well creates value, while change handled badly turns into technical debt. What matters is that the software we write not only works on day zero, but also does not blow into a billion pieces on some random Friday evening.

Ad hoc algorithms absorb change badly: an unforeseen turn in the requirements usually means rewriting a significant part of the algorithm. They also tend to blend optimization logic with business logic, which is exactly what makes that rewrite a risky undertaking. A solver makes the separation natural. In the best case, a new requirement becomes a few extra lines of model rather than a full overhaul.

There are, today, plenty of excellent open-source solvers (SCIP, HiGHS and CP-SAT, to name a few) and just as many commercial ones, should you need more firepower. The landscape is not limited to MILP and CP either: there are solvers built on metaheuristics too.

Writing an ad hoc algorithm for a specific problem should be, in my opinion, the last resort. There are exceptions, naturally. The most obvious one is when the algorithm is the product: if the company's competitive advantage is the performance or the feature set of its optimization engine, then that is exactly where the time should go. Another typical case is a problem whose model formulation simply does not scale past tiny instances. Running into one of these exceptions is no mortal sin, but I would recommend being absolutely certain that it is a real business need and not just a chance to show off.

When you do write an ad hoc algorithm, I recommend against being too clever. The odds that our brilliant inventions beat well-established methods are slim, and the odds that the colleague who inherits the code has not the faintest idea what is going on are frighteningly high. Better to lean on known, well-studied schemes: large neighborhood search, ruin-and-recreate, GRASP, tabu search, simulated annealing, and so on. They are documented, they behave predictably, and anyone with a background in optimization recognizes them on sight.

As we all know, the job of an operations researcher consists of receiving a well-defined list of functional requirements and implementing a model or an algorithm that solves the corresponding optimization problem. Once we wake up from this beautiful dream, we realize that the list does not exist, and that writing it is part of the job. Extracting an optimization problem out of a decision process takes a continuous dialogue with domain experts: understanding how the process works, projecting part of it into an optimization problem, pruning whatever is redundant. Sometimes there is no decision process to speak of, and designing one falls to us as well.

This activity, which some aptly call “knowledge crunching”,[^4] is perhaps the most important component of the entire project. I would go so far as to say that, once the requirements are properly pinned down, developing the model or the algorithm is the easy part. Not that it is trivial, but it is the part we know best how to govern, which is precisely why our energy is better spent on knowledge crunching. That said, to be maximally effective in a role this relational, you need a bedrock of technical skill underneath.

Let me close with a list of practical advice, an attempt to sum up what I find myself needing to know how to do in my day-to-day work.

- Know how to brandish a solver. For instance: diagnosing an infeasible model, reading a solution log, knowing the main solver parameters and anticipating their effect on the search, spotting the weak points of a formulation, and so on.
- Know how to iterate quickly. Getting to a first working solution fast is essential, because it is what lets us collect feedback from the end user early. A greedy written in an hour is generally worth more than two weeks spent polishing a model.
- Know how to explain a solution. Sooner or later someone will ask why vehicle 3 serves that customer and not the other one. Being able to answer precisely is what builds trust in the tool.
- Be comfortable with Linux, Git and containers.
- Be comfortable with an SQL database. My recommendation is PostgreSQL, for its remarkably complete feature set. A book I recommend is [Just Use Postgres!](https://www.manning.com/books/just-use-postgres) by Denis Magda.
- Be comfortable with a high-level language. The obvious choice is Python, with its data analysis libraries (pandas, polars, etc.), bindings for every well-known solver, and backend tooling (FastAPI, etc.).
- Be comfortable with a low-level language, for writing ad hoc algorithms: C, C++, Rust, Zig, etc. On modern machines the way data is laid out in memory has a significant impact on the performance of the code, and high-level languages make certain optimizations hard, if not impossible. I recommend Andrew Kelley's excellent talk, “[Practical Data Oriented Design](https://www.youtube.com/watch?v=IroPQ150F6c)”, and references therein.
- Be comfortable with modern software release and distribution mechanisms on one of the major platforms (GitHub Actions, Bitbucket Pipelines, etc.). Being able to deploy a new version of your algorithm on demand is essential to responding quickly when customers report something.
- Know the fundamentals of web technologies. A bit of HTML, CSS, JavaScript and a UI framework (I personally like [Svelte](https://svelte.dev)) is enough to put together a small page of your own that draws solutions on a map or a chart. A tool like that is invaluable during development, because the eye catches in two seconds the anomalies that a table hides, and it is the fastest way to show customers what we are building.
- Know the fundamentals of the HTTP protocol and how to develop REST APIs.

Let me know if you found this advice useful, if I got something wrong, or if you have something to add.

[^1]: I am not entirely sure “operations researcher” is an actual word. For what it is worth, industry does not seem to have a canonical name for the trade either: I have come across operations research specialist, operations research scientist, operations research analyst, optimization engineer, and occasionally the ever-colorful data scientist. In the end everyone picks their own, usually whichever one looks best on LinkedIn.

[^2]: I say this with complete impartiality: my own background is in telecommunications engineering. I am effectively larping as an operations researcher.

[^3]: On this, I recommend Rubén Ruiz's excellent talk, “[Pragmatic OR: solving large-scale optimization problems in fast-moving environments](https://www.youtube.com/watch?v=GIh6d3rb0_4)”.

[^4]: The term comes from Eric Evans's seminal [Domain-Driven Design](https://www.goodreads.com/en/book/show/179133.Domain_Driven_Design). I recommend [Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/) by Vlad Khononov as an introduction to the subject.
