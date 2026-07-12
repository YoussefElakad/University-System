package com.revkov.spring.Doctors;

import com.revkov.spring.Students.StudentDTO;
import com.revkov.spring.Users.UsersRep;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class DoctorServ
{
    private final DoctorRep repd;
    private final UsersRep repu;
    private final DoctorMapper mapper;
    private String generatecode()
    {
        return "DOC-" +
                UUID.randomUUID().toString()
                        .substring(0,8)
                        .toUpperCase();

    }


    public Page<DoctorDTO> ReturnDocs(int page, int size)
    {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("doctorid")
        );

        return repd.findAll(pageable)
                .map(mapper::toDTO);
    }
    public DoctorDTO ReturnDocID(Long id) {
        return repd.findById(id).map(mapper::toDTO).orElse(null);
    }
    public DoctorDTO ReturnDocUser(String username) {
        return mapper.toDTO(repd.findByUsers(repu.findByUsername(username).orElseThrow(()->new RuntimeException("User Not Found"))).orElseThrow(()->new RuntimeException("User Not a Doctor")));
    }

    public DoctorDTO Insertdoc(DoctorRequestDTO dto)
    {
        if (dto.getPhone() == null)
        {
            throw new RuntimeException("Enter a valid phone number");
        }
        Doctor d = new Doctor(
                null, dto.getFirst_name(),dto.getLast_name(),
                dto.getAge(),dto.getEmail()
                ,dto.getPhone(),dto.getAddress(),null,generatecode());

        repd.save(d);
        return mapper.toDTO(d);
    }

    public DoctorDTO Deletedoc(Long id)
    {
        Doctor d = repd.findById(id).orElseThrow(()-> new RuntimeException("Doctor Not Found"));
        repd.deleteById(id);

        return mapper.toDTO(d);
    }

    public DoctorDTO Updatedoc(Long id,DoctorRequestDTO dto)
    {

        Doctor d = repd.findById(id).orElseThrow(()-> new RuntimeException("Doctor Does Not Exist"));

        d.setFirst_name(dto.getFirst_name());
        d.setLast_name(dto.getLast_name());
        d.setAge(dto.getAge());
        d.setEmail(dto.getEmail());
        d.setPhone(dto.getPhone());
        d.setAddress(dto.getAddress());

        repd.save(d);
        return mapper.toDTO(d);
    }

}
