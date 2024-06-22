CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL ,
    type VARCHAR(50) NOT NULL ,
    lock_unlock_status VARCHAR(6) NOT NULL ,
    CONSTRAINT Lock_Unlock_Status_Value CHECK (lock_unlock_status in ("Lock", "Unlock")),
    current_speed DECIMAL(5, 2) NOT NULL ,
    battery_level INT NOT NULL ,
    CONSTRAINT Battery_Level_Range CHECK (battery_level >= 0 AND battery_level <= 100),
    status VARCHAR(20) NOT NULL ,
    location DECIMAL(9, 6) NOT NULL ,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);