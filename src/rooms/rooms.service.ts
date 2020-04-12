import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import {RoomRepository} from './room.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomStatus } from './room-status.enum';

@Injectable()
export class RoomsService {
    constructor (
        @InjectRepository(RoomRepository)
        private roomRepository : RoomRepository,
    ){}    
    
    async getRooms(filterDto:GetRoomsFilterDto):Promise<Room[]>{
        return this.roomRepository.getRooms(filterDto);
    }
    // private rooms:Room[] = [];

    // getAllRooms(): Room[]{
    //     return this.rooms;
    // }
    async getRoomById(id:number):Promise<Room>{
        const found = await this.roomRepository.findOne(id);
        if(!found) 
        {
            throw new NotFoundException(`Room with id ${id} not found.`);
        } 
        return found;
    }
    // getRoomById(id:string):Room{
    //     const found= this.rooms.find(room=> room.id===id) ;
    //     if(!found) 
    //     {
    //         throw new NotFoundException(`Room with id ${id} not found.`);
    //     }      
    //     return found;
    // }

    // getRoomsWithFilters(filterDto:GetRoomsFilterDto):Room[]{
    //     const {category, search} = filterDto;
    //     let rooms = this.getAllRooms();
    //     if(category)
    //     {
    //         rooms = rooms.filter(room=>room.category===category);
    //     }
    //     if(search){ 
    //         rooms = rooms.filter(room =>
    //             room.title.includes(search) ||
    //             room.address.includes(search)||
    //             room.address.includes(search),    
    //         );
    //     }
    //     return rooms;
    // }

    async createRoom(createRoomDto: CreateRoomDto){
        return this.roomRepository.createRoom(createRoomDto);
    }
    async deleteRoom(id:number):Promise<void>{
        const result= await this.roomRepository.delete(id);
        if(result.affected===0)
        {
            throw new NotFoundException(`Room with id ${id} not found.`);
        }
    }

    async updateRoomStatus(id:number,status:RoomStatus):Promise<Room>{
        const room = await this.getRoomById(id);
        room.status=status;
        await room.save();
        return room;
    }
    // createRoom(
    //     createRoomDto: CreateRoomDto
    // ):Room
    // {
    //     const {title,address,features,description,category,photos,cost,policy}=createRoomDto;
    //     const room:Room = {
    //         id: uuid(),
    //         title,
    //         address,
    //         features,
    //         description,
    //         category,
    //         photos,
    //         cost,
    //         policy,
    //         status: RoomStatus.AVAILABLE,
    //     };
    //     this.rooms.push(room);
    //     return room;
    // }

    // deleteRoom(id:string):void{
    //     const found = this.getRoomById(id);
    //     this.rooms =this.rooms.filter(room=> room.id !== found.id);
    // }
    // updateRoomStatus(id:string,status:RoomStatus):Room{
    //     const room = this.getRoomById(id);
    //     room.status= status;
    //     return room;
    // }
}
