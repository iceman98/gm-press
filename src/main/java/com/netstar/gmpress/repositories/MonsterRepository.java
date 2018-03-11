package com.netstar.gmpress.repositories;

import com.netstar.gmpress.model.Monster;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MonsterRepository extends MongoRepository<Monster, Integer> {
}
