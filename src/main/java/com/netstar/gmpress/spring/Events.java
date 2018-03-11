package com.netstar.gmpress.spring;

import com.google.gson.Gson;
import com.netstar.gmpress.model.Monster;
import com.netstar.gmpress.repositories.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.Arrays;

@Component
public class Events {

    @Autowired
    private MonsterRepository monsterRepository;

    @EventListener(ContextRefreshedEvent.class)
    public void onContextRefreshedEvent(ContextRefreshedEvent event) throws IOException {
        Gson gson = new Gson();
        if (monsterRepository.count() == 0) {
            InputStream resourceStream = this.getClass().getResourceAsStream("/data/monsters.js");
            String resourceString = StreamUtils.copyToString(resourceStream, Charset.defaultCharset());
            Monster[] monsters = gson.fromJson(resourceString, Monster[].class);
            if (monsters != null) {
                monsterRepository.insert(Arrays.asList(monsters));
            }
        }
    }
}
