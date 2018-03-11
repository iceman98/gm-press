package com.netstar.gmpress.controllers;

import com.netstar.gmpress.model.Monster;
import com.netstar.gmpress.repositories.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/monster")
public class MonsterController {

    @Autowired
    private MonsterRepository monsterRepository;

    @RequestMapping("/find")
    public List<Monster> findMonster(@RequestParam("n") String name) {
        return monsterRepository.findAll().stream()
                .filter(m -> m.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }
}
