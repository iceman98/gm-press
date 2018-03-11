package com.netstar.gmpress.spring;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

@Configuration
public class DatabaseConfiguration extends AbstractMongoConfiguration {

    @Override
    protected String getDatabaseName() {
        return "gmpress";
    }

    @Override
    public Mongo mongo() throws Exception {
        return new MongoClient("localhost");
    }

}
