export default { title: 'Story' };
export const myStory = () => {};
myStory.story = {
  name: 'Custom story name',
  controls: {
    name: {
      type: ControlTypes.TEXT,
      label: 'Name',
      value: 'Mark',
      order: 9999,
    },
  },
  smartControls: {
    smart: false,
  },
};
