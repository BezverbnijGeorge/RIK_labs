cmake_minimum_required(VERSION 3.16)

project(coffee_editor VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD_REQUIRED ON)


find_package(Qt6 REQUIRED COMPONENTS Core Gui Qml Quick QuickControls2 QuickDialogs2 VirtualKeyboard)

qt_standard_project_setup(REQUIRES 6.10)

qt_add_executable(appcoffee_editor
    main.cpp
)

qt_add_qml_module(appcoffee_editor
    URI coffee_editor
    QML_FILES
        Main.qml
        SOURCES filehandler.h
)

# Qt for iOS sets MACOSX_BUNDLE_GUI_IDENTIFIER automatically since Qt 6.1.
# If you are developing for iOS or macOS you should consider setting an
# explicit, fixed bundle identifier manually though.
set_target_properties(appcoffee_editor PROPERTIES
#    MACOSX_BUNDLE_GUI_IDENTIFIER com.example.appcoffee_editor
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    MACOSX_BUNDLE TRUE
    WIN32_EXECUTABLE TRUE
    QT_ANDROID_PACKAGE_SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/android"
)

target_link_libraries(appcoffee_editor PRIVATE
    Qt6::Core
    Qt6::Gui
    Qt6::Qml
    Qt6::Quick
    Qt6::QuickControls2    # <-- ДОДАТИ ЦЕ
    Qt6::QuickDialogs2     # <-- І ЦЕ
    Qt6::VirtualKeyboard
)
set_property(TARGET appcoffee_editor PROPERTY QT_ANDROID_PACKAGE_SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/android")

install(TARGETS appcoffee_editor
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)
