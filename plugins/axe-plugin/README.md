# Table of contents

-   [In action](#in-action)
-   [Overview](#overview)
-   [Install](#install)
-   [Documentation](#documentation)
-   [API](#api)
    -   [<ins>AllyBlock</ins>](#insallyblockins)
    -   [<ins>AllyPage</ins>](#insallypageins)
    -   [<ins>AllyBlock</ins>](#insallyblockins-1)
    -   [<ins>AllyBlock</ins>](#insallyblockins-2)
    -   [<ins>AllyPage</ins>](#insallypageins-1)
    -   [<ins>AllyPage</ins>](#insallypageins-2)
    -   [<ins>AxeContextProvider</ins>](#insaxecontextproviderins)
    -   [<ins>SelectionContextProvider</ins>](#insselectioncontextproviderins)
    -   [<ins>useIsTagSelected</ins>](#insuseistagselectedins)
    -   [<ins>isSelected</ins>](#insisselectedins)
    -   [<ins>useIsTagSelected</ins>](#insuseistagselectedins-1)
    -   [<ins>overview</ins>](#insoverviewins)

# In action

[Example site](https://component-controls.com/api/components-actioncontainer--overview/test)

# Overview

Accessibility testing plugin using the [axe-core](https://github.com/dequelabs/axe-core) library from [deque](https://www.deque.com/axe/)

Some of the design goals:

-   Test at the component-level.
-   Provide a dashboard view to quickly see the errors and tests for the component.
-   Ability to select and outline the sub-elements generating the errors.
-   Ability to see details from the errors and passed rules.

<p align="center">
  <img src="https://github.com/ccontrols/component-controls/raw/master/plugins/axe-plugin/images/axe-ally-testing.gif" alt="ally tests with axe plugin" width="738">
</p>

# Install

```sh
yarn add @component-controls/axe-plugin --dev
```

# Documentation

[A11Y Testing](https://component-controls.com/tutorial/testing/axe-plugin)

# API

<react-docgen-typescript path="./src" exclude="AllyDashboard.tsx,BaseAllyBlock.tsx,HighlightSelector.tsx,NodesTable.tsx,ResultsTable.tsx,SelectionContext.tsx" />

<!-- START-REACT-DOCGEN-TYPESCRIPT -->

## <ins>AllyBlock</ins>

Story block container that displays displays the [axe](https://github.com/dequelabs/axe-core) ally test results

_AllyBlock [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/index.tsx)_

### properties

| Name          | Type                 | Description                                                                                                     |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `axeOptions`  | _Spec_               |                                                                                                                 |
| `id`          | _string_             | optional id to be used for the block if no id is provided, one will be calculated automatically from the title. |
| `name`        | _string_             |                                                                                                                 |
| `title`       | _string_             | optional section title for the block.                                                                           |
| `description` | _string_             | optional markdown description.                                                                                  |
| `collapsible` | _boolean_            | if false, will nothave a collapsible frame.                                                                     |
| `sxStyle`     | _ThemeUIStyleObject_ | theme-ui styling object for Block Box                                                                           |
| `data-testid` | _string_             | testing id                                                                                                      |

## <ins>AllyPage</ins>

_AllyPage [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/index.tsx)_

## <ins>AllyBlock</ins>

Story block container that displays displays the [axe](https://github.com/dequelabs/axe-core) ally test results

_AllyBlock [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/AllyBlock/AllyBlock.tsx)_

### properties

| Name          | Type                 | Description                                                                                                     |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `axeOptions`  | _Spec_               |                                                                                                                 |
| `id`          | _string_             | optional id to be used for the block if no id is provided, one will be calculated automatically from the title. |
| `name`        | _string_             |                                                                                                                 |
| `title`       | _string_             | optional section title for the block.                                                                           |
| `description` | _string_             | optional markdown description.                                                                                  |
| `collapsible` | _boolean_            | if false, will nothave a collapsible frame.                                                                     |
| `sxStyle`     | _ThemeUIStyleObject_ | theme-ui styling object for Block Box                                                                           |
| `data-testid` | _string_             | testing id                                                                                                      |

## <ins>AllyBlock</ins>

Story block container that displays displays the [axe](https://github.com/dequelabs/axe-core) ally test results

_AllyBlock [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/AllyBlock/index.ts)_

### properties

| Name          | Type                 | Description                                                                                                     |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `axeOptions`  | _Spec_               |                                                                                                                 |
| `id`          | _string_             | optional id to be used for the block if no id is provided, one will be calculated automatically from the title. |
| `name`        | _string_             |                                                                                                                 |
| `title`       | _string_             | optional section title for the block.                                                                           |
| `description` | _string_             | optional markdown description.                                                                                  |
| `collapsible` | _boolean_            | if false, will nothave a collapsible frame.                                                                     |
| `sxStyle`     | _ThemeUIStyleObject_ | theme-ui styling object for Block Box                                                                           |
| `data-testid` | _string_             | testing id                                                                                                      |

## <ins>AllyPage</ins>

_AllyPage [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/AllyPage/AllyPage.tsx)_

## <ins>AllyPage</ins>

_AllyPage [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/AllyPage/index.ts)_

## <ins>AxeContextProvider</ins>

_AxeContextProvider [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/state/context.tsx)_

## <ins>SelectionContextProvider</ins>

_SelectionContextProvider [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/state/context.tsx)_

## <ins>useIsTagSelected</ins>

_useIsTagSelected [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/state/context.tsx)_

## <ins>isSelected</ins>

_isSelected [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/state/recoil.tsx)_

## <ins>useIsTagSelected</ins>

_useIsTagSelected [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/state/recoil.tsx)_

## <ins>overview</ins>

_overview [source code](https://github.com/ccontrols/component-controls/tree/master/plugins/axe-plugin/src/stories/AllyBlock.stories.tsx)_

<!-- END-REACT-DOCGEN-TYPESCRIPT -->
