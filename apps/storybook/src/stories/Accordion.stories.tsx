import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from '@gold/shared-components/accordion';


const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion className="w-80">
      <Accordion.Item value="one">
        <Accordion.Header>
          <Accordion.Trigger>Section one</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>First panel content.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Header>
          <Accordion.Trigger>Section two</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Second panel content.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};
