import { ActionIcon, Group, Pill, TextInput } from '@mantine/core';
import { useState, type KeyboardEvent } from 'react';

interface SkillsFilterProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsFilter({ skills, onChange }: SkillsFilterProps) {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    const trimmed = inputValue.trim();

    if (!trimmed || skills.includes(trimmed)) {
      return;
    }

    onChange([...skills, trimmed]);
    setInputValue('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSkill();
    }
  };

  return (
    <div data-testid="skills-filter">
      <Group gap="xs" align="flex-end" mb="sm" wrap="nowrap">
        <TextInput
          flex={1}
          placeholder="Навык"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          data-testid="skills-input"
        />
        <ActionIcon
          size={36}
          variant="filled"
          color="blue"
          aria-label="Добавить навык"
          onClick={addSkill}
          data-testid="add-skill-button"
        >
          +
        </ActionIcon>
      </Group>

      <Group gap="xs" wrap="wrap">
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => removeSkill(skill)}
            data-testid={`skill-pill-${skill}`}
          >
            {skill}
          </Pill>
        ))}
      </Group>
    </div>
  );
}
