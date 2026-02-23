package com.saanvi.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "groups")
public class Group {

    @Id
    private String id;

    private String name;
    private List<String> members;

    // Default Constructor
    public Group() {}

    // Parameterized Constructor
    public Group(String name, List<String> members) {
        this.name = name;
        this.members = members;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getMembers() {
        return members;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }
}