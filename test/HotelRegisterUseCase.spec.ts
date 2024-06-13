import { Prisma } from "@prisma/client";
import { expect, it } from "vitest";
import { HotelRegisterUseCase } from "../src/Services/HotelRegister";
import { inMemoryHotelRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";

const hotelData:Prisma.HotelCreateInput = {
    Name:"teste hotel",
    Longitude:1,
    Latitude: 2,
    Description:"o melhor hotel da sua vida"
}
it("should be able to create a hotel",async()=>{
    const CreateHotelUseCase = new HotelRegisterUseCase(new inMemoryHotelRepositorie)

    const createHotel = await CreateHotelUseCase.execute(hotelData)
    expect(createHotel.ReturnObject.Name).toBe(hotelData.Name)
})