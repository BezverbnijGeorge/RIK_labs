cmake_minimum_required(VERSION 3.16)

project(TextEditor VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Пошук пакетів Qt
find_package(Qt6 REQUIRED COMPONENTS Widgets)
set(CMAKE_AUTOMOC ON) # Автоматична обробка слотів і сигналів

add_executable(TextEditor
    main.cpp
    mainwindow.cpp
    mainwindow.h
)

target_link_libraries(TextEditor PRIVATE Qt6::Widgets)