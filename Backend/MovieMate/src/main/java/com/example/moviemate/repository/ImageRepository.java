package com.example.moviemate.repository;

import com.example.moviemate.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
    List<Image> findAllByOwner(String owner);
}
