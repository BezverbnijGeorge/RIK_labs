#ifdef Q_OS_ANDROID
#include <QJniObject>
#include <QCoreApplication>
#endif
#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickStyle>
#include "filehandler.h"

int main(int argc, char *argv[])
{

    qputenv("QT_IM_MODULE", QByteArray("qtvirtualkeyboard"));

    QQuickStyle::setStyle("Material");

    QGuiApplication app(argc, argv);

#ifdef Q_OS_ANDROID
    QJniObject activity = QNativeInterface::QAndroidApplication::context();
    if (activity.isValid()) {
        // Запускаємо в головному UI-потоці Android
        QNativeInterface::QAndroidApplication::runOnAndroidMainThread([activity]() {
            QJniObject window = activity.callObjectMethod("getWindow", "()Landroid/view/Window;");
            if (window.isValid()) {
                // 48 (0x30) — це системна константа WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING
                window.callMethod<void>("setSoftInputMode", "(I)V", 48);
            }
        });
    }
#endif

    // Реєструємо C++ бекенд
    qmlRegisterType<FileHandler>("MyBackend", 1, 0, "FileHandler");

    QQmlApplicationEngine engine;

    QObject::connect(
        &engine,
        &QQmlApplicationEngine::objectCreationFailed,
        &app,
        []() { QCoreApplication::exit(-1); },
        Qt::QueuedConnection);

    engine.loadFromModule("coffee_editor", "Main");

    return app.exec();
}