# Backend

## Overview

After a couple weeks working on the backend, I would like to add some observations. Sorry if I missed something. This document proposes a new backend architecture for the Encore Operator. The current version would be improved in the following aspects:

- Current version relies on a polyrepo architecture that would be changed to monorepo.
- In order to create an endpoint in the current version, it is necessary to create a couple pull requests on different repos. This extra work would be eliminated, with improved speed and software quality.
- Current backend microservice does not validate properly the data traffic coming from other microservices. The next backend version should validate all input data, in order to detect and handle errors, avoiding their propagation inside the system.
- Current version only does end-to-end (e2e) testing. They are very expensive, since they require setting up the whole infrastructure in order to run. This cost is even bigger if we consider VPN access dependency. Next version should add faster and more cirurgical unit and integration tests. These tests would use local and lighter infrastructure, like SQLite running on local containers at developer's machines.
- The project's API is growing now very fast to comply with the evolving project specifications. Currently, the inititive comes from the frontend side, responsible for specifying the endpoints. The side effect of this strategy is that backend developers are always running behind the schedule. The next version would propose a more robust API that  allows backend developers to set a project standard for a basic paging, sorting and filtering scheme to be used on the whole project.

### Monorepo

To [help us to understand](https://blog.bitsrc.io/monorepo-vs-polyrepo-5-things-you-should-consider-897f3b588e70) the difference between Monorepos vs Polyrepos, a monorepo is a single repository for one or more projects. Polyrepos are the opposite, identifying different projects, components, and dependencies before splitting them into multiple repositories.

Following are some advantages of the monorepo adoption at Encore's backend project:

- Monorepos enable better visibility and collaboration across teams, naturally encouraging code reuse.
- Monorepo can simplify DevOps, as a single repository helps to build the entire codebase at once.
- Monorepos enable atomic commits and greatly simplify large-scale refactoring. In a single commit, developers can update multiple packages or projects.

In a polyrepo, developers must make Pull Requests for each repo and figure out which order to build the changes, whereas, in a Monorepo, you only need to make an atomic Pull Request that contains all commits related to the feature that you are working on.

### Framework dependency

Your [framework will die](https://rajeshnaroth.medium.com/framework-and-package-dependencies-will-kill-your-application-c0c1d7df24e2) one day, no matter how hot it is now. There's no answer for handling this, you can just remind about jQuery, among others. A product is the result of several teams working together. A horizontal dependency happens when you integrate/adopt a solution provided by an entity outside your domain. If there is no upgrade path accounted in the product dev roadmap or a new version of the framework has breaking changes, there will be a big impact on the projects that choose to have tight framework dependency.

The current proposal is based on how the team responds today to the following questions:

- Is the framework and its dependent components being actively maintained?
- What about its github star rating?
- Can you delete a feature by just deleting a folder?
- Consider that another team is responsible for developing components or abstractions that are reused in your app. If that team changed or switched priorities, now you have to either maintain them yourselves or change your app to model after their new direction. Is this strategy acceptable?
- Are you writing your own and customized abstractions when possible? Is the use case small and/or customized enough to avoid installing a full third party library?

### Domain modeling

[Domain modeling and DDD](https://www.infoq.com/articles/ddd-in-practice/) play a vital role in aligning IT with the business units. Concepts like **Ubiquitous Language** are vital to help business investors to leverage the IT team and focus on a process of continuous improvement of the project.

The domain model is a representation of the business entities. Based on that, business and infrastructural components should be designed and implemented around the domain model.

The Domain Driven Design (DDD) is about mapping business domain concepts into software artifacts. Originally based on Eric Evans' book "Domain Driven Design", it covers the domain modeling and design aspects from a conceptual and design stand-point.

## Monorepo projects

The proposed backend would be initially composed of a couple projects. Please note that this is a preliminary step. Other projects may be added to the same repo in the future. Following are details about both projects and links to the preliminary available code.

- **Core project**: include the core business rules agreed by investors and developers.
- **Framework project**: leverage the facilities from the chosen framework to build the infrastructure components.

### Core project

The Core project includes the code that complies with the rules agreed between business and IT experts. Business rules are an important part of the business domain. They define data validation and other constraints that need to be applied on domain objects in specific business process scenarios. Business rules typically fall into the following categories:

- Data validation
- Data transformation
- Business decision-making
- Process routing (work-flow logic)

The Core project would include for each Entity the following functionalities:

- **Domain**: Entities, Repositories, Validators, Fake-builders, Uuid and Errors handling.
- **Application**: Use-cases, Data Transfer Objects (DTO) for search, pagination and output.
- **Infrastructure**: In-memory Repository, Searchable In-memory Repository, Sequelize Repository, Sequelize Searchable Repository.

More details about this project are available at following links:

https://github.com/CrypTixEncore/creator-fan-relations/tree/FAN-456/src/creator

https://github.com/CrypTixEncore/creator-fan-relations/tree/FAN-456/src/%40seedwork


### Framework project

The framework project includes the code to connect the Core project to the Infrastructure components. The current backend version requires developers rewrite code that is already available at the frameworks, like routing, and message parameter/body assignments.

The next version should be improved to allow type checking/autofill at Typescript to facilitate and improve developers to leverage the exceptional resources available at Visual Studio Code. This would improve software quality and eliminate many issues related to bugs, allowing developers to focus on the new functionalities that the project requires.

The Framework project would include for each Entity the following functionalities:

- **Application**: Data Transfer Objects (DTO), Presenter, and Fixtures.
- **Infrastructure**: DBs, and messaging.
- **E2e tests**: Use-cases tests, including whole infrastructure inside the VPN.

More details about this project are available at following links:

https://github.com/CrypTixEncore/creator-fan-relations/tree/FAN-456/src/creators

https://github.com/CrypTixEncore/creator-fan-relations/tree/FAN-456/src/%40share


From each entity's perspective in the project, the proposed version would provide the following functionalities:

- **Use-case**: create, get, list, update, delete.
- **Controllers**: create, search, findOne, update, remove.
- **Services**: create, search, findOne, update, remove.
- **Presenters**: to allow more efficient entity API customization .
- **DTO**: create, update, search.
- **Fixture**: to make easier and standardize tests.

Note: The preliminary code is available for the **Creator** entity. Similar code would be necessary for the other entities.