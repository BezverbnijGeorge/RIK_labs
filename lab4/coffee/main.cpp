#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickStyle>
#include "filehandler.h"

int main(int argc, char *argv[])
{
    // Обов'язково вмикаємо красивий Android-стиль
    QQuickStyle::setStyle("Material");

    QGuiApplication app(argc, argv);

    // Реєструємо C++ бекенд
    qmlRegisterType<FileHandler>("MyBackend", 1, 0, "FileHandler");

    QQmlApplicationEngine engine;

    // Завантажуємо модуль, який ми вказали в CMakeLists.txt
    engine.loadFromModule("TextEditorApp", "Main");
    if (engine.rootObjects().isEmpty())
        return -1;

    return app.exec();
}