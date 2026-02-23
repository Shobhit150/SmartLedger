package com.saanvi.backend.repository;

import com.saanvi.backend.model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends MongoRepository<Expense, String> {

    // Find expenses by groupId
    List<Expense> findByGroupId(String groupId);
}