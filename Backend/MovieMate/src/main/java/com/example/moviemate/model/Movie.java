package com.example.moviemate.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="movie")
@Data
public class Movie {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    public Movie() {

    }
    public Movie(Long movieId){
        this.id = movieId;
    }
}
