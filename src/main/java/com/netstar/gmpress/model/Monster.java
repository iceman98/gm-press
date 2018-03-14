package com.netstar.gmpress.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class Monster {

    @Id
    private Integer index;

    private String name;
    private String size;
    private String type;
    private String subtype;
    private String alignment;
    private Integer armor_class;
    private Integer hit_points;
    private String hit_dice;
    private String speed;

    // Abilities
    private Integer strength;
    private Integer dexterity;
    private Integer constitution;
    private Integer intelligence;
    private Integer wisdom;
    private Integer charisma;

    // Saves
    private Integer constitution_save;
    private Integer strength_save;
    private Integer intelligence_save;
    private Integer wisdom_save;
    private Integer charisma_save;
    private Integer dexterity_save;

    // Skills
    private Integer acrobatics;
    private Integer arcana;
    private Integer athletics;
    private Integer deception;
    private Integer history;
    private Integer insight;
    private Integer intimidation;
    private Integer investigation;
    private Integer medicine;
    private Integer nature;
    private Integer perception;
    private Integer performance;
    private Integer persuasion;
    private Integer religion;
    private Integer stealth;
    private Integer survival;

    // Resistances
    private String damage_resistances;
    private String damage_immunities;
    private String damage_vulnerabilities;

    private String condition_immunities;

    private String senses;
    private String languages;
    private Double challenge_rating;
    private List<SpecialAbility> special_abilities;
    private List<SpecialAbility> reactions;
    private List<Action> actions;
    private List<Action> legendary_actions;
    private String url;

}
