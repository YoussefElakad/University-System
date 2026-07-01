package com.revkov.spring.Doctors;

import com.revkov.spring.Users.UsersMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class DoctorMapper {

    private final UsersMapper mapper;

    public DoctorDTO toDTO(Doctor d) {
        if (d == null)
            return null;

        return new DoctorDTO(
                d.getDoctorid(),
                d.getFirst_name(),
                d.getLast_name(),
                d.getAge(),
                d.getEmail(),
                d.getPhone(),
                d.getAddress(),
                mapper.toDTO(d.getUsers()),
                d.getDoctorcode()
        );
    }

    public Doctor toEntity(DoctorDTO dto)
    {
        Doctor d = new Doctor();

        d.setDoctorid(dto.getDoctorid());
        d.setFirst_name(dto.getFirst_name());
        d.setLast_name(dto.getLast_name());
        d.setAge(dto.getAge());
        d.setEmail(dto.getEmail());
        d.setPhone(dto.getPhone());
        d.setAddress(dto.getAddress());
        d.setUsers(mapper.toEntity(dto.getUsers()));
        d.setDoctorcode(dto.getDoctorcode());

        return d;
    }
}