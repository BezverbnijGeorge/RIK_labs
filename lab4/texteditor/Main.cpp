#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickStyle> // <-- Підключаємо стилі
#include "filehandler.h"

using namespace Qt::StringLiterals;

int main(int argc, char *argv[])
{
    // 1. ВАЖЛИВО: Вмикаємо стиль САМЕ ТУТ! ДО QGuiApplication
    QQuickStyle::setStyle("Material");

    // 2. Тільки тепер створюємо сам додаток
    QGuiApplication app(argc, argv);

    // 3. Реєструємо наш C++ клас
    qmlRegisterType<FileHandler>("MyBackend", 1, 0, "FileHandler");

    // 4. Завантажуємо інтерфейс
    QQmlApplicationEngine engine;
    const QUrl url(u"qrc:/App.qml"_s);

    QObject::connect(&engine, &QQmlApplicationEngine::objectCreationFailed,
                     &app, []() { QCoreApplication::exit(-1); },
                     Qt::QueuedConnection);

    engine.load(url);

    return app.exec();
}