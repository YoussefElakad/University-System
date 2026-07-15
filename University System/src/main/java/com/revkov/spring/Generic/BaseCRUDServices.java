package com.revkov.spring.Generic;


import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@AllArgsConstructor
public abstract class BaseCRUDServices<T,ID> {

    private final JpaRepository<T,ID> genrepo;

    protected  <D> List<D> getAll(Function<T,D> mapper)
    {
        return genrepo.findAll()
                .stream().map(mapper).collect(Collectors.toList());
    }

    protected <D> Page<D> getPages(
            int page,
            int size,
            String sortBy,
            Function<T, D> mapper) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy)
        );

        return genrepo.findAll(pageable)
                .map(mapper);
    }

    protected <D> D getByID(ID id,Function<T,D> mapper)
    {
        return genrepo.findById(id)
                .map(mapper)
                .orElseThrow(()-> new RuntimeException("ID Not Found"));
    }

    protected void deleteEnt(ID id)
    {
        genrepo.deleteById(id);
    }

}
