# Angular Lab Talk

- git commits are good talking points for the progression of application building.

## Separate Front-end and Back-end

- Front-end is compiled Typescript + HTML index.html
- Back-end is HTTP communication 
- Connected by proxy (simulating same site SPA)

## Front-end

```bash
# Create new Angular application with @angular/cli
ng new angular-lab --ai-config none --skip-git  --ssr false --style tailwind 
mv angular-lab frontend
```

**Directory Overview**

- [fontend](./frontend/) **Angular Workspace [docs](https://angular.dev/reference/configs/file-structure)** 
  - [angular.json](./frontend/angular.json) *configure angular application* : *used by angular cli to build project*
  - [package.json](./frontend/package.json) *project node configuration* : *used by npm for dependency management, script running*
  - [tsconfig.*json](./frontend/tsconfig.json) *Typescript compiler configuration* : *Angular compiler configuration too*
  - [src](./frontend/src/) *base directory for angular source code*
    - [index.html](./frontend/src/index.html) *Basic html template* : *Default used by compilation process of angular application*
    - [styles.css](./frontend/src/styles.css) *Basic css template*  : *used by compilation process of angular application* --> [Ref: angular.json](./frontend/angular.json)
    - [main.ts](./frontend/src/main.ts) *Root Entry point for Application*  --> [Ref: angular.json](./frontend/angular.json)
    - [proxy.conf.json](./frontend/src/proxy.conf.json) *Proxy Configuration* : *Used in Development to bypass CORS*  --> [Ref: angular.json](./frontend/angular.json)
    - [*.spec.ts](./frontend/src/app/app.spec.ts) *Unit Test files*
  - [dist](./frontend/dist) *angular build output directory* --> [docs](https://angular.dev/tools/cli/build#output-directory)

### Angular Component

#### Example [App](./frontend/src/app/app.ts)

- `@Component({...})` class [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html) *configure metadata Component.*
  - **Metadata**
    - **CSS selector**
      - *selector:* 
        - Node name or HTML tag name (should not be reserved) `app-angular-selector`
        - Attribute with optional value `[app-angular-selector]` or `[app-angular-selector="awesome"]`
        - Class name used html tag `.app-angular-selector`
        - Combine - you can combine selectors also `button[app-angular-selector="thisonehere"]`
        - Multiple - you can declare multiple selectors to be used by component `app-angular-selector, [app-angular-selector]`
    - **HTML template**
      - *template:* string to be rendered
      - *templateUrl:* string declaring relative location to file that will be rendered to the DOM
    - **Styling** *Optional*
      - *styles:* string of css styles to be applied to components DOM 
      - *styleUrl:* string declaring relative location to file that contain styles to be applied to components DOM
    - **Importing** Optional
      - *imports:* [] Array of other components, services, directives or pipes to be used by your component.

- `export class`
  - Class name should be unique to your angular app.
  - Should be exportable to other typescript files.


### Create Home Component

```bash
cd frontend/
ng generate component home -s --skip-tests --flat
```

- Using the angular cli to generate a component named home with in-lined style, skip generating spec tests and perform action within /src/app folder (do not create src/app/home/ folder)

### Routes 

[app.routes.ts](./frontend/src/app/app.routes.ts) Add routing to new Home Component.

```typescript
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: Home },
];
```

### Talking to API

[app.config.ts](./frontend/src/app/app.config.ts)

- Adding `provideHttpClient()` to providers array will make HttpClient available to all components in app using dependency injection.
- Using `httpResource()` to retrieve data.
- Using angular Template to [control-flow](https://angular.dev/guide/templates/control-flow) of data;
  - @if @else blocks
  - @for blocks


### Bonus Stuff 

#### API CRUD

```bash
cd frontend/src/app
mkdir pages
ng g c pages/edit -s --skip-tests --flat --dry-run
ng g c pages/create -s --skip-tests --flat --dry-run
```

**Rapid development**

- Build and Run Application; Auto Detect source code changes & rebuild

```bash
cd frontend/
npm start
```


