package com.netstar.gmpress.model;

import lombok.Data;

@Data
public class Action {

    private String name;
    private String desc;
    private Integer attack_bonus;
    private String damage_dice;
    private Integer damage_bonus;

}
