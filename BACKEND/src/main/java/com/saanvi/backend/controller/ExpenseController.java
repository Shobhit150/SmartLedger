package com.saanvi.backend.controller;

import com.saanvi.backend.model.Expense;
import com.saanvi.backend.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    // ✅ Add new expense (with automatic split calculation)
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {

        if (expense.getParticipants() != null && !expense.getParticipants().isEmpty()) {

            int totalPeople = expense.getParticipants().size();
            double splitAmount = expense.getAmount() / totalPeople;

            expense.setSplitAmount(splitAmount);
        } else {
            expense.setSplitAmount(0);
        }

        return expenseRepository.save(expense);
    }

    // ✅ Get all expenses
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // ✅ Get expenses by groupId
    @GetMapping("/group/{groupId}")
    public List<Expense> getExpensesByGroup(@PathVariable String groupId) {
        return expenseRepository.findByGroupId(groupId);
    }

    // ✅ Delete expense by id
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable String id) {
        expenseRepository.deleteById(id);
        return "Expense deleted successfully";
    }
}