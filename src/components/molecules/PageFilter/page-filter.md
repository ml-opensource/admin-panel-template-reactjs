# PageFilter

When displaying data in an admin panel, it is quite common to also have a way of filtering the data. This `PageFilter` component achieves this by updating the search params / query string in the URL. Which means that a user will be able to share a URL with a predefined set of filters, as well as have history of their choices. These parameters can then of course be accessed from almost anywhere that has access to the window object, or more conveniently with the use of our custom `useSearchParams` hooks.

## Basic usage

In its simplest form the `PageFilter` can be used with practically no setup, and only requires that you wrap your fields in the `FilterItem` component. The reason for this, is that the `PageFilter` component makes use of the Ant Design `Form` component to detect changes and so on. This also means that the `PageFilter` can accept any props that the `Form` component can. This also applies for the `FilterItem`, which is based on the Ant Design `Form.Item` component.

Let's have a look at a simple example:

```tsx
import { Select } from "antd";

import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";

const { Option } = Select;

<PageFilter>
  <FilterItem label="Client" name="client">
    <Select>
      <Option value="chrhansen">Chr. Hansen</Option>
      <Option value="kerzner">Kerzner</Option>
      <Option value="mashreq">Mashreq</Option>
    </Select>
  </FilterItem>
</PageFilter>;
```

With this simple setup any changes to your filters will be reflected in the URL. The property `name` on the `FilterItem` component, is what defines what the given search param will be called in the URL.

In order to retrieve the search params of your filter from the URL, and have code completion, you will need to create an `interface`/`type` for your filter properties, and pass it to the `useSearchParams` hook.

```tsx
import useSearchParams from "@app/hooks/useSearchParams";

interface ClientFilterProps {
  client?: string;
}

const { search } = useSearchParams<ClientFilterProps>();
```

You will now have code completion, and TypeScript won't flag it is a non-exist property.

## Parsing field types

By default when retrieving search params from the URL, they are all returned as a `string` or `boolean`. If you have fields that have values other than strings and booleans, then we have built in the functionality to parse `dates` and `numbers`. If you do not use these properties, then your filter will fail upon page reload, if the URL contains predefined filter params, as the value will not match up to your field's specific data type.

| Property       | Description                                                                                                                                                                                                                                                                   | Type                         | Default |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| `parseDates`   | Runs through the query string and parses strings with date values. You can pass it an array of the specific keys that should be passed, or a boolean if all strings and arrays with date values should be parsed. **Use this when using date pickers.**                       | `boolean` \| Array\<keyof T> | -       |
| `parseNumbers` | Runs through the query string and parses strings with numbers. You can pass it an array of the specific keys that should be passed, or a boolean if all strings and arrays with number values should be parsed. **Use when you have fields that contain numbers for values.** | `boolean` \| Array\<keyof T> | -       |

### Specifying fields to parse

As noted for all the parameters, you can either pass in a `boolean` or an `array`. Passing in `array` of `strings` allows you to specify exactly which fields / parameters you want parsed, and as what data type. It is also recommended to pass a type containing the properties to the PageFilter. Let's take a look at an example.

```tsx
import { Select } from "antd";

import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";

const { Option } = Select;

interface PeriodFilterProps {
  period?: number;
}

<PageFilter<PeriodFilterProps> parseNumber={["period"]}>
  <FilterItem label="Period" name="period">
    <Select>
      <Option value={28}>Past 28 days</Option>
      <Option value={84}>Past 3 months</Option>
      <Option value={168}>Past 6 months</Option>
    </Select>
  </FilterItem>
</PageFilter>;
```

Passing the `interface`/`type` to the `PageFilter` component isn't strictly necessary, but it does give you code completion, when defining which property you want to have parsed.

### Debounce fields

In some cases you will have a text field, which will update the url on every change unless you have a submit button. But without the submit button, you can use the `DebouncedInput` component to debounce the changes in an input and thus only update the url after a specific delay.

For example:

```tsx
import { Input } from "antd";
import DebouncedInput from "@app/components/atoms/DebouncedInput/DebouncedInput";

<PageFilter>
  <FilterItem label="Search for name" name="search">
    <DebouncedInput wait={500} />
  </FilterItem>
</PageFilter>;
```

## Trigger reset / submit

By default the filter will update whenever a field changes. We have however supplied two props that render a submit button, and a reset button. With these props set, the filter will not update until the submit button has been clicked. The reset button clears all fields.

It is also possible to trigger the filter from outside of the `PageFilter` component by way of two `boolean` properties and two function properties. Let's have a look at how this is achieved.

| Property           | Description                                       | Type         | Default              |
| ------------------ | ------------------------------------------------- | ------------ | -------------------- |
| `showResetButton`  | Renders a reset button that clears all fields     | `boolean`    | `false`              |
| `showSubmitButton` | Renders a submit button that submits the filter   | `boolean`    | `false`              |
| `onReset`          | Function to call once a reset has been triggered  | `() => void` | -                    |
| `onSubmit`         | Function to call once a submit has been triggered | `() => void` | -                    |
| `resetText`        | Text for the reset button                         | `string`     | `t("default.reset")` |
| `submitText`       | Text for the submit button                        | `string`     | `t("default.apply")` |

## Layout

### Columns

By default the `PageFilter` component is setup using the Ant Design grid system, and will without further setup have 4 columns on desktop, 2 columns on tablet, and 1 column on mobile. If you want an all vertical filter, you can simply set the column count to 1.

| Property  | Description                                     | Type                                   | Default |
| --------- | ----------------------------------------------- | -------------------------------------- | ------- |
| `columns` | Sets the amount of columns there are on desktop | `1` \| `2` \| `3` \| `4` \| `5` \| `6` | `4`     |

We have defined a maximum of 6 columns for now, as we do not think more will be necessary. However, if you need more, you can simply adjust the property type in the `PageFilter` component.

### Layout modes

As the `PageFilter` component can accept the same props as the `Form` component from Ant Design, you can also pass it the different layout modes described [here](https://ant.design/components/form/#components-form-demo-layout). However, we have not as of yet accommodated the different layout modes in the `PageFilter` component. If you need any of these different modes, you will likely need to add your own styles to the `PageFilter` component. We might look into this in the future.
