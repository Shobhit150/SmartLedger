package com.saanvi.backend.controller;

import com.saanvi.backend.model.Group;
import com.saanvi.backend.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")   // allow frontend connection
@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    // ================= GET ALL GROUPS =================
    @GetMapping
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    // ================= GET GROUP BY ID =================
    @GetMapping("/{id}")
    public Group getGroupById(@PathVariable String id) {
        return groupRepository.findById(id).orElse(null);
    }

    // ================= CREATE GROUP =================
    @PostMapping
    public Group createGroup(@RequestBody Group group) {
        return groupRepository.save(group);
    }

    // ================= DELETE GROUP =================
    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable String id) {
        groupRepository.deleteById(id);
    }
}