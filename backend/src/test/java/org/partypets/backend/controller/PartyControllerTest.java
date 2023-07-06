package org.partypets.backend.controller;

import org.junit.jupiter.api.Test;
import org.partypets.backend.model.DTOParty;
import org.partypets.backend.service.PartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Date;


@SpringBootTest
@AutoConfigureMockMvc
class PartyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PartyService partyService;


    @Test
    @DirtiesContext
    void expectPartyList_whenGettingAllParties() throws Exception {
        //Given
        DTOParty newParty = new DTOParty(new Date(), "Home", "Dog-Bday");
        this.partyService.add(newParty);
        String expected = """
                    [
                        {
                            "location": "Home",
                            "theme": "Dog-Bday"
                         }
                    ]
                """;


        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/parties"))

                //Then
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    void expectNewPartyInList_whenPostingParty() throws Exception {
        String newParty = """
                {
                    "location": "Home",
                    "theme": "Dog-Bday"
                }
                """;

        String expected = """
                [
                {
                "location": "Home",
                 "theme": "Dog-Bday"
                }
                ]
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/parties").content(newParty).contentType(MediaType.APPLICATION_JSON))

                //Then
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }


    @Test
    @DirtiesContext
    void expectParty_whenGettingByID() throws Exception {
        //Given
        DTOParty newParty = new DTOParty(new Date(), "Home", "Dog-Bday");
        this.partyService.add(newParty);
        String id = partyService.list().get(0).getId();
        String expected = """
                   
                        {
                            "id": "%s",
                            "location": "Home",
                            "theme": "Dog-Bday"
                         }
                    
                """.formatted(id);


        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/parties/" + id))

                //Then
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    void expectUpdatedParty_whenPuttingParty() throws Exception {
        //Given
        DTOParty newParty = new DTOParty(new Date(), "Home", "Dog-Bday");
        this.partyService.add(newParty);
        String id = partyService.list().get(0).getId();
        String actual = """
                   
                        {
                            "id": "%s",
                            "location": "PawPalace",
                            "theme": "Party"
                         }
                    
                """.formatted(id);
        String expected = """
                   
                        {
                            "id": "%s",
                            "location": "PawPalace",
                            "theme": "Party"
                         }
                    
                """.formatted(id);


        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/parties/" + id).content(actual).contentType(MediaType.APPLICATION_JSON))

                //Then
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    void expectNoParty_whenDeletingParty() throws Exception {
        //Given
        DTOParty newParty = new DTOParty(new Date(), "Home", "Dog-Bday");
        this.partyService.add(newParty);
        String id = partyService.list().get(0).getId();
        String expected = """
                  []
                """;

        //When
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/parties/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/parties"))

                //Then
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }
}



