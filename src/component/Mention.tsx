import React, { useState, ChangeEvent } from "react";
import data from "../constant/data.json";
import "../App.css";

const MentionComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [mentions, setMentions] = useState<string[]>([]);
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const [filteredMentions, setFilteredMentions] = useState<string[]>([]);

  const allMentions: string[] = data;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value;
    setInputValue(text);

    if (text.includes("@")) {
      const atIndex: number = text.lastIndexOf("@");
      setMentionStart(atIndex);
      const searchTerm = text.substring(atIndex + 1);
      const filtered: string[] = allMentions.filter((mention) =>
        mention.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMentions(filtered);
    } else {
      setMentionStart(null);
      setFilteredMentions([]);
    }
  };

  const handleSelectMention = (mention: string) => {
    const updatedMentions: string[] = [...mentions, mention];
    const newValue: string = inputValue.slice(0, mentionStart! + 1) + mention;
    setInputValue(newValue);
    setMentions(updatedMentions);
    setMentionStart(null);
   
  };

  return (
    <div>
      <div>
        <input
          placeholder="Mention"
          value={inputValue}
          onChange={handleInputChange}
          style={{padding: 10, width: '300px', color: '#060b6e'}}
        />
      </div>
      {mentionStart !== null && (
        <div style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
          {filteredMentions.map((mention, index) => (
            <button key={index} onClick={() => handleSelectMention(mention)}>
              {mention}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentionComponent;
