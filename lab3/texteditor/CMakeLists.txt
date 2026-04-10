cmake_minimum_required(VERSION 3.16)
project(AndroidTextEditor VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Шукаємо необхідні модулі Qt6
find_package(Qt6 REQUIRED COMPONENTS Core Gui Qml Quick QuickControls2)

target_sources(texteditor
  PRIVATE
    filehandler.h
)

qt_standard_project_setup()

# Створюємо виконуваний файл
qt_add_executable(AndroidTextEditor
    main.cpp
    filehandler.h
)

# Додаємо QML файли до проєкту (сучасний підхід Qt 6)
qt_add_qml_module(AndroidTextEditor
    URI Main
    VERSION 1.0
    QML_FILES main.qml
)

# Підключаємо бібліотеки
target_link_libraries(AndroidTextEditor
    PRIVATE Qt6::Core Qt6::Gui Qt6::Qml Qt6::Quick Qt6::QuickControls2
)