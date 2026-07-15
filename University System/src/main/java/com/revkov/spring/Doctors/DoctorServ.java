package com.revkov.spring.Doctors;

import com.revkov.spring.Generic.BaseCRUDServices;
import com.revkov.spring.Users.UsersRep;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DoctorServ extends BaseCRUDServices<Doctor,Long>
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

    public DoctorServ(DoctorRep repd, UsersRep repu, DoctorMapper mapper) {
        super(repd);
        this.repd = repd;
        this.repu = repu;
        this.mapper = mapper;
    }

    public Page<DoctorDTO> ReturnDocs(int page, int size)
    {
        return getPages(page,size,"doctorid",mapper::toDTO);
    }
    public DoctorDTO ReturnDocID(Long id) {
        return getByID(id,mapper::toDTO);
    }
    public DoctorDTO ReturnDocUser(String username) {
        return mapper.toDTO(repd.findByUsers(repu.findByUsername(username).orElseThrow(()->new RuntimeException("User Not Found"))).orElseThrow(()->new RuntimeException("User Not a Doctor")));
    }

    public void Deletedoc(Long id)
    {
        deleteEnt(id);
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
}
