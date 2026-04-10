cmake_minimum_required(VERSION 3.16)
project(AndroidTextEditor VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Важливо: увімкнути обробку ресурсів
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Core Gui Qml Quick QuickControls2 QuickDialogs2)

qt_standard_project_setup()

# Додаємо всі файли напряму
qt_add_executable(AndroidTextEditor
    main.cpp
    filehandler.h
    qml.qrc      # <-- Наш новий файл ресурсів
)

set_target_properties(AndroidTextEditor PROPERTIES
   QT_ANDROID_PACKAGE_SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/android")

target_link_libraries(AndroidTextEditor
    PRIVATE Qt6::Core Qt6::Gui Qt6::Qml Qt6::Quick Qt6::QuickControls2 Qt6::QuickDialogs2
)
set_property(TARGET AndroidTextEditor PROPERTY QT_ANDROID_PACKAGE_SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/android")